import bcrypt from 'bcrypt';
import { Hasher } from '../../data/protocols/cryptography/hasher';
import { HashComparer } from '../../data/protocols/cryptography/hashComparer';


export class BcryptAdapter implements Hasher, HashComparer {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return hash;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash);
    return new Promise((resolve) => resolve(isValid));
  }
}
