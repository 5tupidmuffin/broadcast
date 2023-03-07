import React, { FC } from "react";
import { useRouter } from "next/router";

import s from "./AddNewReplyForm.module.scss";
import * as APICalls from "@/APICalls";

const AddNewReplyForm: FC = () => {
  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const imageboardInitials = router.query?.imageboardInitials;
    const threadId = router.query?.threadId;
    const formData = new FormData(e.currentTarget);
    formData.append("thread", threadId as string);
    const [data, error] = await APICalls.addNewReply(
      imageboardInitials as string,
      Number(threadId),
      formData
    );
    if (data) {
      alert("reply posted! update to see it!");
    }
  };

  return (
    <div className={s.newReplyFormContainer}>
      <h2 className={s.formTitle}>Post A Reply</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="author" placeholder="author" />
        <br />
        <input type="text" name="title" placeholder="title" required />
        <br />
        <textarea
          name="body"
          id="body"
          cols={30}
          rows={10}
          placeholder="reply body"
        ></textarea>
        <br />
        <label htmlFor="image">Your Image: </label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/png, image/gif, image/jpeg"
        />
        <br />
        <button className={s.newReplyBtn} type="submit">
          Post Reply
        </button>
      </form>
    </div>
  );
};

export default AddNewReplyForm;
