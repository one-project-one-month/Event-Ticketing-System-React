import { useState, type HTMLInputTypeAttribute } from "react";
import { createBusinessEmail } from "@/services/BusinessOwnerServices";
import type { createBusinessOwnerData } from "@/Admin/DataTypes/BusinessOwner";

export default function VenueForm({ openDialog }: { openDialog: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phNo, setPhNo] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: createBusinessOwnerData = {
      fullName: name,
      email,
      phone: phNo,
    };

    try {
      setLoading(true);
      const res = await createBusinessEmail(payload);

      if (res.isSuccess) {
        openDialog();
        setName("");
        setEmail("");
        setPhNo("");
      } else {
        console.error("Failed to create business owner:", res.message);
      }
    } catch (err) {
      console.error("Error creating business owner:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="figtreef float-right h-fit w-[26rem] rounded-lg bg-gradient-to-b from-[#103263] to-[#071739] px-9 py-14 text-white">
      <div className="mb-9 text-center">
        <h2 className="mb-4 text-3xl font-semibold">Request for Quotation</h2>
        <p>
          Feel free to contact us anytime or submit an online inquiry for a
          quotation. We'll help you find the perfect venue, tailored to the
          specific needs and details of your event.
        </p>
      </div>

      <form action="post" onSubmit={submitForm}>
        <LabelInput
          name="name"
          label="Full Name"
          required
          type="text"
          placeholder="Enter full name"
          state={name}
          setState={setName}
        />
        <LabelInput
          name="email"
          label="Email"
          required
          type="email"
          placeholder="example@gmail.com"
          state={email}
          setState={setEmail}
        />
        <PhoneInput value={phNo} setValue={setPhNo} />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-white py-4 text-center text-black transition-colors duration-500 hover:bg-[#103263] hover:text-white disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

function LabelInput({
  name,
  label,
  required,
  type,
  placeholder,
  state,
  setState,
}: {
  name: string;
  label: string;
  required: boolean;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  state: string;
  setState: (v: string) => void;
}) {
  return (
    <div className="mb-9 flex flex-col">
      <label htmlFor={name} className="text-2xl">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={state}
        onChange={(e) => setState(e.target.value)}
        name={name}
        className="bg-white px-3 py-4 text-[16px] text-black"
      />
    </div>
  );
}

function PhoneInput({
  value,
  setValue,
}: {
  value: string;
  setValue: (v: string) => void;
}) {
  function formatPhoneNumber(value: string): string {
    if (!value) return "";
    const digits = value.replace(/\D/g, "");
    let formatted = "(+";
    if (digits.length > 0) formatted += digits.substring(0, 2);
    if (digits.length >= 3) formatted += ") " + digits.substring(2, 5);
    if (digits.length >= 6) formatted += " - " + digits.substring(5, 8);
    if (digits.length >= 9) formatted += " - " + digits.substring(8, 13);
    return formatted;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "");
    setValue(digits);
  }

  return (
    <div className="mb-9 flex flex-col">
      <label htmlFor="phone" className="text-2xl">
        Phone Number <span className="text-red-400">*</span>
      </label>
      <input
        type="text"
        name="phone"
        placeholder="(+__) ___ - ___ - _____"
        value={formatPhoneNumber(value)}
        onChange={handleChange}
        className="bg-white px-3 py-4 text-[16px] text-black"
      />
    </div>
  );
}
