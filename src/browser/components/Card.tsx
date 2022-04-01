import React, { FC, HTMLAttributes, useMemo } from "react";
import tw, { styled } from "twin.macro";

import { MenuProps } from "./Menu";

import Anchor from "./Anchor";
import ContextMenu from "./ContextMenu";

const ActionButton = styled.button`
  ${tw`p-1 rounded transition text-neutral-600 hover:text-black dark:(text-neutral-400 hover:text-white)`}

  svg {
    ${tw`flex-none stroke-current w-5`}

    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2px;
  }
`;

const ActionMenu = styled.div`
  ${tw`flex gap-1 items-center -mr-1 pl-3`}
`;

const Wrapper = styled(Anchor)`
  ${tw`relative hover:(bg-neutral-200 dark:bg-neutral-800)`}

  :not(:hover) ${ActionMenu} {
    ${tw`hidden`}
  }
`;

export interface CardProps {
  className?: string;
  actionButtons?: HTMLAttributes<HTMLButtonElement>[];
  ellipsisMenu?: MenuProps;
  to: string;
}

const Card: FC<CardProps> = (props) => {
  const actionMenu = useMemo(() => {
    const result =
      props.actionButtons?.map((props, index) => <ActionButton key={index} {...props} />) ?? [];

    if (props.ellipsisMenu) {
      result.push(
        <ContextMenu placement="bottom-end" menu={props.ellipsisMenu}>
          {(ref) => (
            <ActionButton ref={ref}>
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="19" r="1" />
                <circle cx="12" cy="5" r="1" />
              </svg>
            </ActionButton>
          )}
        </ContextMenu>
      );
    }

    if (result.length === 0) {
      return null;
    }

    return <ActionMenu>{result}</ActionMenu>;
  }, [props.actionButtons, props.ellipsisMenu]);

  return (
    <Wrapper target="_blank" href={props.to} className={props.className}>
      {props.children}
      {actionMenu}
    </Wrapper>
  );
};

export default Card;
