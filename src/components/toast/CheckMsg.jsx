import { IoCheckmark } from "react-icons/io5";

export default function CheckMsg({ msg }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
      }}
    >
      <IoCheckmark color="white" size="1.2rem" />
      <div>{msg}</div>
    </div>
  );
}
