"use server";

export type ContactFormProps = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  message: string;
};
export async function send_contact_message(props: ContactFormProps) {
  const contact_object = {
    name: props.first_name,
    last_name: props.last_name,
    email: props.email,
    phone_number: props.phone_number,
    message: props.message,
  };
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/contact-submissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact_object),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error sending contact message", error);
    throw new Error("Error sending contact message");
  }
}
