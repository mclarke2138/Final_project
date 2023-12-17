import { useState } from "react";
import { useForm } from "react-hook-form";

export default function TestForm() {
  const [username, setUsername] = useState("");
  const { register, handleSubmit } = useForm();

  const handleOnChange = (evt) => {
    setUsername(evt.target.value);
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault;
    console.log("Here");
  };

  return (
    <form action="" onSubmit={handleSubmit(handleOnSubmit)}>
      <input
        type="text"
        {...register("username")}
        id="username"
        onChange={handleOnChange}
        value={username}
      />
    </form>
  );
}
