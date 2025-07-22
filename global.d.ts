// This file contains type declarations for modules used in the project

// Allow JSX syntax in .tsx files
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Add @ts-expect-error comments in component files as needed
// This approach is mentioned in the memory about TypeScript fixes
