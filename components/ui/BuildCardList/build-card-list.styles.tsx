import styled from "styled-components"
import { COLS, GUTTER } from "./design-tokens"

export const BuildCardListWrapper = styled.div`
  //
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Columns = styled.div`
  --cols: ${COLS};
  --gutter: ${GUTTER}px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: var(--gutter);
`

export const Column = styled.div`
  --width: calc(
    100% / var(--cols) - (var(--gutter) * (var(--cols) - 1) / var(--cols))
  );
  flex: 0 0 var(--width);
  width: var(--width);
`

export const Item = styled.div`
  & + & {
    margin-top: var(--gutter);
  }
`
