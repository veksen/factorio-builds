import { lighten } from "polished"
import styled from "styled-components"
import { getTypo } from "../../../design/helpers/typo"
import { COLOR } from "../../../design/tokens/color"
import { ETypo } from "../../../design/tokens/typo"
import Button from "../Button"
import { ButtonWrapper } from "../Button/button.styles"
import Stacker from "../Stacker"

export const BlueprintItemWrapper = styled.div<{ depth: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  margin-left: ${(props) => (props.depth > 0 ? 40 : 0)}px;
`

export const BlueprintItemInner = styled.div``

export const ImageWrapper = styled.div`
  width: 200px;

  img {
    cursor: zoom-in;
  }

  img.is-zoomed {
    cursor: zoom-out;
  }
`

export const SpinnerWrapper = styled.div`
  background: ${COLOR.FADEDBLUE100};
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const InnerContent = styled(Stacker)`
  flex-grow: 1;
`

export const Content = styled.div`
  padding: 16px;
  color: ${COLOR.FADEDBLUE900};
  margin: 4px 0;
  background: ${COLOR.CARD};
  border-radius: 5px;
  border: 2px solid ${COLOR.CARD};

  .is-highlighted & {
    border: 2px solid ${COLOR.SELECTED} !important;
  }
`

export const Buttons = styled.div`
  display: flex;
  margin: 16px -4px 0;

  ${ButtonWrapper} {
    margin: 4px;
  }
`

export const ZoomedImage = styled.div`
  margin-top: 16px;

  ${ImageWrapper},
  img {
    width: 100%;
  }
`

export const Info = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  color: ${COLOR.FADEDBLUE900};
`

export const Title = styled(Stacker)`
  ${getTypo(ETypo.CARD_TITLE)};
  line-height: 1.1;
  display: flex;
  align-items: center;
  min-height: 28px;

  a {
    color: #fff;
  }
`

export const Meta = styled.small`
  color: ${COLOR.FADEDBLUE500};
  font-weight: 400;
`

export const Expand = styled.button`
  margin: 0;
  border: 0;
  padding: 0;
  background: transparent;
  color: ${COLOR.LINK};
  margin-left: auto !important;
  cursor: pointer;
  flex: 0 0 auto;

  &:hover {
    color: ${lighten(0.05, COLOR.LINK)};
  }
`

export const Expanded = styled.div``

export const Description = styled.p`
  margin: 0;
  font-size: 15px;

  & + & {
    margin: 16px 0 0 0;
  }
`

export const RequiredItems = styled.div`
  //
`

export const Subtitle = styled.h3`
  ${getTypo(ETypo.METADATA_TITLE)};
  font-size: 16px;
  margin-top: 0;
`

export const SelectRenderButton = styled(Button)`
  margin-top: 8px;
  align-self: flex-end;
`
