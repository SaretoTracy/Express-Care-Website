export interface ILoginRes {
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      caregiverAddress?: {
        id: number;
        street: string;
        state: string;
        zipcode: string;
        phoneNumber: string;
        city: string;
        gender: string;
        dob: string;
      };
      providersAddress?: {
        city: "string";
        homeName: "string";
        phoneNumber: "string";
        state: "string";
        street: "string";
        website: "string";
        workEmail: "string";
        zipcode: "string";
      };
      roles: [
        {
          id: number;
          name: string;
        }
      ];
      createdAt: string;
      verified: boolean;
    };
    accessToken: string;
  }
  