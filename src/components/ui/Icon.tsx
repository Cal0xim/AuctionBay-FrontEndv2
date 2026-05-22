import React from "react";

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

const DEFAULT_SIZE = 30;

/** Clock */
export function ClockIcon({ size = DEFAULT_SIZE, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.49333 3.84C8.71333 3.06 7.69333 2.66667 6.66667 2.66667V6.66667L3.84 9.49333C5.4 11.0533 7.93333 11.0533 9.5 9.49333C11.06 7.93333 11.06 5.4 9.49333 3.84ZM6.66667 0C2.98667 0 0 2.98667 0 6.66667C0 10.3467 2.98667 13.3333 6.66667 13.3333C10.3467 13.3333 13.3333 10.3467 13.3333 6.66667C13.3333 2.98667 10.3467 0 6.66667 0ZM6.66667 12C3.72 12 1.33333 9.61333 1.33333 6.66667C1.33333 3.72 3.72 1.33333 6.66667 1.33333C9.61333 1.33333 12 3.72 12 6.66667C12 9.61333 9.61333 12 6.66667 12Z"
        fill="#071015"
    />
    </svg>
  );
}

/** Home */
export function HomeIcon({ size = DEFAULT_SIZE, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.00016 3.79333L11.3335 6.79333V12H10.0002V8H6.00016V12H4.66683V6.79333L8.00016 3.79333ZM8.00016 2L1.3335 8H3.3335V13.3333H7.3335V9.33333H8.66683V13.3333H12.6668V8H14.6668L8.00016 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Plus / Add */
export function PlusIcon({ size = DEFAULT_SIZE, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.6668 8.66658H8.66683V12.6666H7.3335V8.66658H3.3335V7.33325H7.3335V3.33325H8.66683V7.33325H12.6668V8.66658Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Check */
export function CheckIcon({ size = DEFAULT_SIZE, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.0001 10.7799L3.2201 7.9999L2.27344 8.9399L6.0001 12.6666L14.0001 4.66656L13.0601 3.72656L6.0001 10.7799Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Chevron Right */
export function ChevronRightIcon({
  size = DEFAULT_SIZE,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.66656 4L5.72656 4.94L8.7799 8L5.72656 11.06L6.66656 12L10.6666 8L6.66656 4Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Search */
export function SearchIcon({ size = DEFAULT_SIZE, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.3333 9.33333H9.80667L9.62 9.15333C10.2733 8.39333 10.6667 7.40667 10.6667 6.33333C10.6667 3.94 8.72667 2 6.33333 2C3.94 2 2 3.94 2 6.33333C2 8.72667 3.94 10.6667 6.33333 10.6667C7.40667 10.6667 8.39333 10.2733 9.15333 9.62L9.33333 9.80667V10.3333L12.6667 13.66L13.66 12.6667L10.3333 9.33333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Person */
export function PersonIcon({ size = DEFAULT_SIZE, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
           <path
        d="M7.99984 4.00008C8.73317 4.00008 9.33317 4.60008 9.33317 5.33341C9.33317 6.06675 8.73317 6.66675 7.99984 6.66675C7.2665 6.66675 6.6665 6.06675 6.6665 5.33341C6.6665 4.60008 7.2665 4.00008 7.99984 4.00008ZM7.99984 10.6667C9.79984 10.6667 11.8665 11.5267 11.9998 12.0001H3.99984C4.15317 11.5201 6.2065 10.6667 7.99984 10.6667ZM7.99984 2.66675C6.5265 2.66675 5.33317 3.86008 5.33317 5.33341C5.33317 6.80675 6.5265 8.00008 7.99984 8.00008C9.47317 8.00008 10.6665 6.80675 10.6665 5.33341C10.6665 3.86008 9.47317 2.66675 7.99984 2.66675ZM7.99984 9.33342C6.21984 9.33342 2.6665 10.2267 2.6665 12.0001V13.3334H13.3332V12.0001C13.3332 10.2267 9.77984 9.33342 7.99984 9.33342Z"
        fill="currentColor"
      />
     </svg>
    
  );
}

/** Delete */
export function DeleteIcon({ size = DEFAULT_SIZE, ...props }: IconProps) {
  return (
     <svg
     width={size}
     height={size}
     viewBox="0 0 16 16"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
     {...props}
     >

    <path d="M4.00016 12.6667C4.00016 13.4 4.60016 14 5.3335 14H10.6668C11.4002 14 12.0002 13.4 12.0002 12.6667V4.66667H4.00016V12.6667ZM5.3335 6H10.6668V12.6667H5.3335V6ZM10.3335 2.66667L9.66683 2H6.3335L5.66683 2.66667H3.3335V4H12.6668V2.66667H10.3335Z" fill="#071015"/>
</svg>

    
  );
}

export const Icons = {
  Clock: ClockIcon,
  Home: HomeIcon,
  Plus: PlusIcon,
  Check: CheckIcon,
  ChevronRight: ChevronRightIcon,
  Search: SearchIcon,
  Person: PersonIcon,
  Delete: DeleteIcon,
};