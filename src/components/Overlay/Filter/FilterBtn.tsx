import { Dispatch, SetStateAction } from "react";

interface Props {
    isOverLayFilter: boolean,
    setIsOverLayFilter: Dispatch<SetStateAction<boolean>>
}

export const FilterBtn: React.FC<Props> = ({isOverLayFilter, setIsOverLayFilter}) => {
    return (
        <div 
            style={{
                position: 'fixed', // Ensures it stays in the viewport
                zIndex: 1000, // Ensures it's above other elements
                bottom: '20px', // 20px from the bottom of the viewport
                right: '20px', // 20px from the right of the viewport
                width: '65px',
                height: '30px',
                borderRadius: '20px',
                background: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional shadow for better visibility
            }}
            onClick={() => setIsOverLayFilter(p => !p)}
        >
            <p style={{ fontSize: '12px', fontWeight: 'bold', margin: 0 }}>
                {isOverLayFilter ? 'Close' : 'Filter'}
            </p>

            {isOverLayFilter ? 
                null
                    :
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="#000"
                        d="M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2M6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2z"
                    />
                </svg>
            }
        </div>
    );
};
