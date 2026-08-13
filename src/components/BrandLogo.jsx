import React from 'react';

const BrandLogo = ({ size = 'medium', className = '', style = {} }) => {
  // Dimension mapping based on size prop
  const dimensions = {
    small: { width: 135, height: 56 },
    medium: { width: 165, height: 68 },
    large: { width: 250, height: 104 },
    xlarge: { width: 340, height: 140 }
  };

  const dim = dimensions[size] || dimensions.medium;

  return (
    <div
      className={`brand-logo-badge ${className}`}
      style={{
        display: 'inline-block',
        lineHeight: 0,
        filter: 'drop-shadow(0 4px 12px rgba(227, 6, 19, 0.2))',
        transition: 'transform 0.3s ease',
        ...style
      }}
    >
      <svg
        width={dim.width}
        height={dim.height}
        viewBox="0 0 320 135"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main White Rounded Card Box with Red Outline */}
        <rect
          x="15"
          y="24"
          width="290"
          height="74"
          rx="24"
          ry="24"
          fill="#FFFFFF"
          stroke="#E30613"
          strokeWidth="4.5"
        />

        {/* Top Circle Emblem Box (Intersecting the Top Border) */}
        <circle
          cx="160"
          cy="24"
          r="26"
          fill="#FFFFFF"
          stroke="#E30613"
          strokeWidth="4"
        />

        {/* Outer Red Crescent Ring inside top circle */}
        <path
          d="M 144 14 C 138 24 142 36 154 42 C 140 40 135 26 144 14 Z"
          fill="#E30613"
        />

        {/* Green Leaf Graphic inside top circle */}
        <path
          d="M 160 6 C 174 12 178 30 166 40 C 154 42 146 26 160 6 Z"
          fill="#00A651"
        />

        {/* Leaf Center White Vein */}
        <path
          d="M 152 34 C 158 24 163 15 163 10"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Inner Red Accent Curve */}
        <path
          d="M 148 12 C 144 20 145 28 150 34"
          stroke="#E30613"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* "GS" Text in Bold Red */}
        <text
          x="44"
          y="78"
          fontFamily="'Poppins', 'Arial Black', 'Impact', sans-serif"
          fontWeight="900"
          fontSize="48"
          fill="#E30613"
          letterSpacing="-1px"
        >
          GS
        </text>

        {/* "Designs" Text in Emerald Green */}
        <text
          x="118"
          y="78"
          fontFamily="'Poppins', 'Trebuchet MS', sans-serif"
          fontWeight="700"
          fontSize="45"
          fill="#00A651"
        >
          Designs
        </text>

        {/* Red Oval Dot on the 'i' in "Designs" */}
        <ellipse
          cx="205"
          cy="48"
          rx="5.5"
          ry="7.5"
          fill="#E30613"
          transform="rotate(12 205 48)"
        />

        {/* Bottom Emerald Green Capsule Badge ("ADVERTISING AGENCY") */}
        <path
          d="M 60 97 C 60 97 68 124 160 124 C 252 124 260 97 260 97 Z"
          fill="#00A651"
        />

        {/* "ADVERTISING AGENCY" Serif Text */}
        <text
          x="160"
          y="114"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="900"
          fontSize="12.5"
          fill="#FFFFFF"
          letterSpacing="1px"
        >
          ADVERTISING AGENCY
        </text>
      </svg>
    </div>
  );
};

export default BrandLogo;
