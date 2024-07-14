import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

/**
 * https://docs.adminjs.co/ui-customization/writing-your-own-components#custom-component-structure
 */
const bundleFile = (key: string, path: string) => {
  return componentLoader.add(key, path, 'bundleFile'); // `bundleFile` is the name of this function
};

const Components = {
  ButtonCopy: bundleFile('ButtonCopy', './ui/component/button-copy-property-type'),
  PageDashboard: bundleFile('PageDashboard', './ui/page/dashboard'),
  EnvironmentVariableList: bundleFile('EnvironmentVariableList', './ui/component/environment-variable-list'),
};

componentLoader.override('Login', './ui/page/login');

export { componentLoader, Components };
