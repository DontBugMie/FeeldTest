export interface Photo {
  url: string;
  width: number;
  height: number;
}

export interface AssociatedProfile {
  age: number;
  gender: string;
  sexuality: string;
  name: string;
}

export interface Profile {
  id: string;
  info: {
    age: number;
    type: string;
    gender: string;
    sexuality: string;
    name: string;
    about?: string;
    desires?: String[];
    interests?: String[];
  };
  associated?: AssociatedProfile;
  photos: Photo[];
}
