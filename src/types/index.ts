interface Cache {
  status: string;
  size: number;
  created: string;
}

interface CollectionReference {
  $ref: string;
  $id: number;
  oid: number;
}

interface CreatorRef {
  _id: number;
  avatar: string;
  name: string;
  email: string;
}

interface MediaItem {
  // You might need to define the properties of MediaItem based on the actual structure which isn't fully specified here
}

interface UserReference {
  $ref: string;
  $id: number;
}

interface Raindrop {
  broken: boolean;
  cache: Cache;
  collection: CollectionReference;
  collectionId: number;
  cover: string;
  created: string;
  creatorRef: CreatorRef;
  domain: string;
  excerpt: string;
  highlights: any[]; // Specify the type if highlights have a specific structure
  important: boolean;
  lastUpdate: string;
  link: string;
  media: MediaItem[];
  note: string;
  removed: boolean;
  sort: number;
  tags: string[]; // Assume tags are an array of strings unless specified otherwise
  title: string;
  type: string;
  user: UserReference;
  _id: string;
}
