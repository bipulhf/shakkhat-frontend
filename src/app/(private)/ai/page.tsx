"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  return (
    <div className='w-[1600px]'>
      <h1 className='mb-2 text-xl'>Schedule Better with AI</h1>
      <div>
        <Textarea placeholder='Enter your meeting details' rows={5} />
        <Button className='mt-2 font-semibold' onClick={async () => {}}>
          Get the best schedule
        </Button>
      </div>
    </div>
  );
}
