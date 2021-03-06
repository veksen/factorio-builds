import { lighten } from "polished"
import styled from "styled-components"
import { getTypo } from "../../../design/helpers/typo"
import { COLOR } from "../../../design/tokens/color"
import { ETypo } from "../../../design/tokens/typo"
import { Footer } from "../../ui/LayoutDefault/layout-default.styles"
import Stacker from "../../ui/Stacker"

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  ${Footer} {
    margin-top: 0;
  }
`

export const BuildImage = styled.div`
  border: 8px solid ${COLOR.CARD};
  width: 100%;

  img {
    display: block;
    width: 100%;
  }
`

export const ZoomedImage = styled.div`
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid ${COLOR.FADEDBLUE300};

  ${BuildImage} {
    border: none;
    margin: 8px 0;
  }
`

export const GlowWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: ${COLOR.CARD};

  svg {
    opacity: 0.85;
    width: 100%;
  }
`

export const ImageWrapper = styled.div`
  cursor: zoom-in;

  .is-zoomed & {
    cursor: zoom-out;
  }
`

export const CopyClipboardWrapper = styled.div`
  margin-bottom: 16px;
`

export const EditBuild = styled.span`
  align-self: flex-start;
  cursor: pointer;
  color: ${COLOR.LINK};
  border-bottom: 1px solid ${COLOR.LINK};

  &:hover {
    color: ${lighten(0.3, COLOR.LINK)};
    border-color: ${lighten(0.3, COLOR.LINK)};
  }
`

export const BlueprintData = styled.textarea`
  flex: 1 0 auto;
  box-sizing: border-box;
  word-wrap: break-word;
  max-height: 400px;
  overflow-y: scroll;
  margin-top: 12px;
  background: transparent;
  color: ${COLOR.FADEDBLUE900};
  border: none;
  width: 100%;
`

export const TabsWrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`

export const TabsInnerWrapper = styled.div`
  border-bottom: 1px solid ${COLOR.FADEDBLUE300};
`

export const TabsItems = styled(Stacker)`
  --scrollbarBG: ${COLOR.BACKGROUND};
  --thumbBG: ${COLOR.FADEDBLUE300};

  scrollbar-width: thin;
  scrollbar-color: var(--thumbBG) var(--scrollbarBG);

  @media screen and (max-width: 767px) {
    overflow-x: scroll;
    overflow-y: hidden;
  }

  &::-webkit-scrollbar {
    width: 11px;
    height: 11px;
  }

  &::-webkit-scrollbar-track {
    background: var(--scrollbarBG);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--thumbBG);
    border-radius: 6px;
    border: 3px solid var(--scrollbarBG);
  }
`

export const TabsContent = styled.div`
  display: flex;
  flex: 1 0 auto;
`

export const TabsContentInner = styled.div`
  flex: 1 1 auto;
  display: flex;
`

export const TabsAside = styled.aside`
  flex: 0 0 400px;
  width: 400px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
  border-left: 1px solid ${COLOR.FADEDBLUE300};
  margin-left: 16px;

  .is-zoomed & {
    opacity: 0;
  }
`

export const Tab = styled.a`
  ${getTypo(ETypo.BUTTON)};
  position: relative;
  text-decoration: none;
  padding: 10px 0;
  color: ${COLOR.FADEDBLUE900};
  cursor: pointer;
  white-space: nowrap;

  &::after {
    position: absolute;
    content: "";
    height: 2px;
    left: 0;
    right: 0;
    bottom: -1px;
  }

  &:hover::after {
    background: ${COLOR.FADEDBLUE900};
  }

  &.is-active {
    font-weight: 700;
  }

  &.is-active::after {
    background: ${COLOR.FADEDBLUE900};
  }
`

export const TabWrapper = styled.div`
  display: none;
  padding: 16px 0;

  & > :first-child {
    margin-top: 0;
  }

  & > :last-child {
    margin-bottom: 0;
  }

  &.is-active {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }
`

export const Description = styled.div`
  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }
`
