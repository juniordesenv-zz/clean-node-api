// eslint-disable-next-line max-classes-per-file
import { Hasher } from '~/data/protocols/cryptography/hasher';
import { Decrypter } from '~/data/protocols/cryptography/decrypter';
import { Encrypter } from '~/data/protocols/cryptography/encrypter';
import { HashComparer } from '~/data/protocols/cryptography/hash-comparer';

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async hash(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'));
    }
  }
  return new HasherStub();
};

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async decrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('any_data'));
    }
  }
  return new DecrypterStub();
};

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async encrypt(id: string): Promise<string> {
      return new Promise((resolve) => resolve('any_token'));
    }
  }

  return new EncrypterStub();
};


export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async compare(value: string, hash: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }

  return new HashComparerStub();
};
