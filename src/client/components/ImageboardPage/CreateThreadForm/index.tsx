import React, { FC } from "react";
import { useRouter } from "next/router";

import s from "./CreateThreadForm.module.scss";
import * as APICalls from "@/APICalls";

const CreateThreadForm: FC = () => {
  const router = useRouter();

  const onSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const imageboardInitials = router.query?.imageboardInitials;
    formData.append("imageboard", imageboardInitials as string);
    const [data, error] = await APICalls.createNewThread(
      imageboardInitials as string,
      formData
    );
    if (data) {
      alert("new thread created!");
    }
  };

  return (
    <div className={s.createThreadFormContainer}>
      <p className={s.formTitle}>Create New Thread!</p>
      <form onSubmit={onSubmitHandler}>
        <input type="text" name="author" placeholder="author" />
        <br />
        <input type="text" name="title" placeholder="thread title" required />
        <br />
        <textarea
          name="body"
          id=""
          cols={30}
          rows={10}
          placeholder="thread body"
        ></textarea>
        <br />
        <label htmlFor="image">Your Image: </label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/png, image/gif, image/jpeg"
          required
        />
        <br />
        <button className={s.createThreadBtn} type="submit">
          Create New Thread
        </button>
      </form>
    </div>
  );
};

export default CreateThreadForm;
