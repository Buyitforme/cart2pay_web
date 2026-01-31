declare module 'naija-state-local-government' {
  interface LGAResponse {
    state: string;
    senatorial_districts: string[];
    lgas: string[];
  }
  
  const NaijaStates: {
    all: () => any;
    states: () => string[];
    lgas: (state: string) => LGAResponse;
  };
  export default NaijaStates;
}
