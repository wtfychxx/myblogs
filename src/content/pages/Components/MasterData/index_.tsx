import { useEffect, useMemo } from 'react';
import { useStoreMaster } from 'src/lib/MasterData';
import Category from 'src/content/pages/Components/MasterData/Category';

// const Category = Loader(lazy(() => import('src/content/pages/Components/MasterData/Category')));


function MasterData({ type }) {
    const renderMaster = useMemo((): JSX.Element => {
        console.log('masuk')
        if(type === 'Category'){
            return <Category />
        }else{
            return <div>not found</div>
        }
    }, []);

    return (
    <>
        <div>
            {type}
            {renderMaster}
        </div>
    </>
  );
}

export default MasterData;