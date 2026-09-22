import { useEffect, type ComponentType } from 'react';

/**
 * Higher-Order Component that logs a message to the console when the
 * wrapped component mounts and unmounts. Useful for tracing component
 * lifecycles during development.
 */
function withLogger<P extends object>(WrappedComponent: ComponentType<P>) {
  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  function ComponentWithLogger(props: P) {
    useEffect(() => {
      console.log(`[withLogger] ${componentName} mounted`);
      return () => console.log(`[withLogger] ${componentName} unmounted`);
    }, []);

    return <WrappedComponent {...props} />;
  }

  ComponentWithLogger.displayName = `withLogger(${componentName})`;
  return ComponentWithLogger;
}

export default withLogger;
