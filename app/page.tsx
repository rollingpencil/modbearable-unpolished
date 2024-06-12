import { Link, Button } from "@nextui-org/react";

import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-left justify-center gap-4 py-8 px-8 md:py-10">
      <div className="inline-block max-w-lg text-left">
        <h1 className={title()}>Welcome.</h1>
        <br />
        <h1 className={title()}>Ready to plan your mods?</h1>
        <br />
        <h1 className={title()}>Let&apos;s get started.</h1>
      </div>

      <div className="flex gap-10 w-2/5">
        <Button
          as={Link}
          color="primary"
          fullWidth={true}
          href={siteConfig.links.onboard}
          isBlock={true}
          size="lg"
          variant="shadow"
        >
          Create
        </Button>
      </div>
      <div className="flex gap-10 w-2/5">
        <Button
          as={Link}
          className="text-white"
          color="success"
          fullWidth={true}
          href={siteConfig.links.onboard}
          isBlock={true}
          size="lg"
          variant="shadow"
        >
          Load
        </Button>
      </div>
    </section>
  );
}
