import React from "react";
import Form from "react-bootstrap/Form";
import ToolTip from "./ToolTip";

/**
 * @author David White on March, 2024
 */

interface InputProps {
  id: string;
  label?: string;
  tooltip?: string;
  defaultChecked?: boolean;
  className?: string;
  disabled?: boolean;
  onChecked?: () => void;
  onUnchecked?: () => void;
}

const Input: React.ForwardRefExoticComponent<InputProps> = React.forwardRef((props, ref) => {
  const [checked, setChecked] = React.useState(props?.defaultChecked || false);

  const onCheckOrUncheck = React.useCallback(() => {
    if (checked) {
      props.onUnchecked?.();
      setChecked(false);
    } else {
      props.onChecked?.();
      setChecked(true);
    }
  }, [checked, props.onChecked, props.onUnchecked]);

  return (
    <Form>
        <Form.Check
            type="checkbox"
            id = {props?.id}
            label = {props?.label}
            defaultChecked = {checked}
            disabled = {props?.disabled}
            onChange={ onCheckOrUncheck }
        >
        </Form.Check>
    </Form>
  );
});

export default Input;
