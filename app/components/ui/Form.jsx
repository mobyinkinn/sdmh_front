import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 1.2rem 2.3rem;
      width: 600px;
      margin: 0 auto;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 50rem;
    `}
    
  overflow: hidden;
  font-size: 1.2rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
