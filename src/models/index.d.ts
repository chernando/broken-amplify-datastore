import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class PrivateNote {
  readonly id: string;
  readonly content: string;
  readonly owner: string;
  constructor(init: ModelInit<PrivateNote>);
  static copyOf(source: PrivateNote, mutator: (draft: MutableModel<PrivateNote>) => MutableModel<PrivateNote> | void): PrivateNote;
}