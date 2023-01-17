import React from 'react';
import styled from 'styled-components';

const DeleteBox = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function DeleteCardArea() {
  return <DeleteBox>삭제 할 카드를 이 곳으로 드래그 하세요.</DeleteBox>;
}

export default DeleteCardArea;
