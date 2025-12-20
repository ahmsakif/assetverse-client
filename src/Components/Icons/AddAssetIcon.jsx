import React from 'react';
import AssetAddIcon from '../../assets/add-product_12023822.png';

const AddAssetIcon = ({ size = '24px', className }) => {
    return (
        <span
            className={className}
            style={{ 
                // 1. Set the size
                width: size, 
                height: size, 
                display: 'inline-block',
                verticalAlign: 'middle',
                
                // 2. Set the color
                // 'currentColor' tells it to use whatever text-color is in the className
                backgroundColor: 'currentColor', 

                // 3. Create the shape using the PNG as a mask
                mask: `url(${AssetAddIcon}) no-repeat center / contain`,
                WebkitMask: `url(${AssetAddIcon}) no-repeat center / contain`,
            }} 
        />
    );
};

export default AddAssetIcon;