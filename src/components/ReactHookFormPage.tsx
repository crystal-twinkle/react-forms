import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../store/redux-hooks";

interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  password_repeat: string;
  gender: string;
  accept: boolean;
  picture: string;
  country: string;
}

export default function ReactHookFormPage() {
  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      age: 18,
      email: "",
      password: "",
      password_repeat: "",
      gender: "",
      accept: true,
      picture: "",
      country: "",
    },
  });

  const { countries } = useAppSelector((state) => state.countries);

  const submit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h2>ReactHookForm</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="name">name</label>
          <input type="text" {...register("name")} id="name" />
        </div>
        <div>
          <label htmlFor="age">age</label>
          <input type="number" {...register("age")} id="age" />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input type="email" {...register("email")} id="email" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" {...register("password")} id="password" />
        </div>
        <div>
          <label htmlFor="password_repeat">repeat password</label>
          <input
            type="password"
            {...register("password_repeat")}
            id="password_repeat"
          />
        </div>
        <div>
          <label htmlFor="gender">gender</label>
          <select {...register("gender")} id="gender">
            <option value="">--Please choose your gender--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="not-say">Prefer not to say</option>
          </select>
        </div>
        <div>
          <label htmlFor="accept">accept</label>
          <input type="checkbox" {...register("email")} id="accept" />
        </div>
        <div>
          <label htmlFor="picture">picture</label>
          <input type="file" {...register("picture")} id="picture" />
        </div>
        <div>
          <label htmlFor="country">countries</label>
          <input
            type="text"
            list="countries"
            {...register("country")}
            id="country"
          />
          <datalist id="countries">
            {countries.map((country, index) => (
              <option key={index} value={country.name.common} />
            ))}
          </datalist>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
