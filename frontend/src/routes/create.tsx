import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { api } from "@/lib/api";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
    },
    //@ts-ignore
    onSubmit: async ({ value }) => {
      // Do something with form data
      await new Promise((r) => setTimeout(r, 1000));
      const res = await api.expenses.$post({ json: value });
      if (!res.ok) throw new Error("server err");
      console.log(value);
    },
  });
  return (
    <div className="p-10">
      <h1 className="text-center">Create</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className="w-[400px] mx-auto"
      >
        <form.Field
          name="title"
          //@ts-ignore
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="amount"
          //@ts-ignore
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
            </>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button className="mt-5" disabled={!canSubmit}>
              {isSubmitting ? "Submitting..." : "Create"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
