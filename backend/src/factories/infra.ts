import { JwtTokenization, Tokenization } from "@/infra/tokenization";
import { Factory } from "./_base";

export const infraTokenizationFactory: Factory<Tokenization> = () =>
  new JwtTokenization();
