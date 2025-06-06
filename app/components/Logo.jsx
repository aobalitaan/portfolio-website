export default function Logo(props) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="500"
      height="500"
      viewBox="0 0 500 500"
      preserveAspectRatio="xMidYMid meet"
      fill="currentColor"
      {...props}
    >
      <g
        transform="translate(0,500) scale(0.1,-0.1)"
        stroke="none"
      >
        <path d="M1560 3024 c-300 -602 -546 -1101 -548 -1109 -3 -13 62 -15 516 -15
        l520 0 7 -47 c19 -130 81 -287 162 -412 56 -87 217 -239 311 -295 175 -104
        373 -153 572 -142 262 15 470 108 656 292 137 135 218 280 271 483 22 87 24
        111 20 251 -3 132 -8 169 -31 245 -133 444 -517 735 -971 735 -84 0 -232 -22
        -297 -45 -26 -9 -40 -9 -46 -2 -4 6 -136 267 -293 581 -157 313 -290 571 -295
        572 -5 1 -254 -490 -554 -1092z m1071 -295 c44 -89 79 -162 77 -163 -2 -2 -19
        -13 -38 -26 -52 -34 -127 -115 -171 -182 -39 -61 -89 -194 -89 -238 0 -50 -4
        -51 -191 -48 l-174 3 3 55 c7 149 104 387 204 502 16 18 41 48 55 66 31 39
        220 190 240 192 2 0 39 -72 84 -161z m579 -86 c146 -34 297 -141 384 -272 57
        -86 81 -142 101 -235 35 -174 1 -344 -101 -498 -169 -253 -498 -358 -780 -249
        -189 74 -352 253 -400 441 -13 52 -14 64 -2 71 7 5 192 9 411 9 218 0 397 2
        397 5 0 3 -79 163 -175 355 -96 192 -175 354 -175 359 0 13 29 21 108 31 78 9
        142 4 232 -17z" />
      </g>
    </svg>
  );
}
