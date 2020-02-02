export interface TokenGenerator {
  generate(vaid: string): Promise<string>
}
