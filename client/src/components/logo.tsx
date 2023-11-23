import { useEffect, useState } from "react";

interface LogoProps {
  height?: number,
  width?: number
}

/**
 * Website logo
 */
const Logo: React.FC<LogoProps> = ({height=170, width=170}) => {
  const [isDarkMode,setIsDarkMode] = useState<boolean>();
  
    return (
        <div>
          <img src="/valhalla_dark.svg" className={`dark:block hidden`} alt="Valhalla_Logo" height={height} width={width} />
          <img src="/valhalla_light.svg" className="dark:hidden block" alt="Valhalla_Logo" height={height} width={width}  />
      </div>
    );
};

export default Logo;