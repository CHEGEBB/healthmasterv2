"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "@/components/CustomFormField";
 
export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    CHECKBOX = "checkbox",
    PHONE_INPUT = "phone_input",
    DATE_PICKER ="date_picker",
    SELECT = "select",
    SKELETON="skeleton",


}
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})
 
function PatientForm(): JSX.Element {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return(
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">
                Hello, welcome to Healthmaster your personal health companion
            </h1>
            <p className="text-dark-700">
                You can schedule your health appointments, track your health records and chat with your doctor.

            </p>

        </section>
        <CustomFormField
        fieldType={ FormFieldType.INPUT}
        control={form.control}
        />
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  )
}
export default PatientForm;