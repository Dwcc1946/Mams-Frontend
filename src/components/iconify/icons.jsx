import { CONFIG } from 'src/config-global';
import { SvgColor } from 'src/components/svg-color';

const icon = (name, color = 'white') => (
    <SvgColor 
      src={`${CONFIG.site.basePath}/assets/icons/general/${name}.svg`} 
      sx={{ color }} // Apply the color
    />
  );

const ICONS = {
  arrowup: icon('arrow-up'),
  arrowdown: icon('arrow-down'),
};

export default ICONS;