import { HTMLInputTypeAttribute, useState } from "react";

export default function useInput({
  type,
}: {
  type: HTMLInputTypeAttribute | undefined;
}) {
  const [value, setValue] = useState("");
  const input = (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
    />
  );
  return [value, input];
}
