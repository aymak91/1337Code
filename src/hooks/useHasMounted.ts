import { useEffect, useState } from "react";


// resolves hydration issues
function useHasMounted() {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);
    return hasMounted;
}

export default useHasMounted;