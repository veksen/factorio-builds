using System;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace FactorioTech.Api.Extensions.Json
{
    /// <summary>
    /// Workaround for System.Text.Json not supporting polymorphic serialization (yet?).
    /// See https://docs.microsoft.com/en-us/dotnet/standard/serialization/system-text-json-polymorphism
    /// </summary>
    public class PolymorphicJsonConverter<T> : JsonConverter<T> where T : class
    {
        public override bool HandleNull => false;
        public override bool CanConvert(Type typeToConvert) => typeof(T).IsAssignableFrom(typeToConvert);
        public override T Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) => throw new NotImplementedException();

        public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
        {
            writer.WriteStartObject();

            foreach (var property in value.GetType().GetProperties()) if (property.CanRead)
            {
                var propertyValue = property.GetValue(value);
                if (propertyValue == null && options.IgnoreNullValues)
                {
                    continue;
                }

                var propertyName = property.CustomAttributes
                        .FirstOrDefault(a => a.AttributeType == typeof(JsonPropertyNameAttribute))
                        ?.ConstructorArguments.FirstOrDefault().Value as string
                    ?? options.PropertyNamingPolicy?.ConvertName(property.Name)
                    ?? property.Name;
   
                writer.WritePropertyName(propertyName);
                JsonSerializer.Serialize(writer, propertyValue, options);
            }

            writer.WriteEndObject();
        }
    }
}
