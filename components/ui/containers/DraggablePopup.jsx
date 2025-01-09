'use client'

import { useState, useRef, useEffect, forwardRef, cloneElement, Children } from 'react';
import ReactDOM from 'react-dom';
import Block from '../Block';
import { IconGripVertical } from '@tabler/icons-react';
import Text from '../text/Text';

const DraggablePopup = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const popupRef = useRef(null);
    const triggerRef = useRef(null);
    const dragOffset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleTriggerClick = () => {
        if (triggerRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            setPosition({
                x: triggerRect.right + 8, // Position to the right of the trigger
                y: triggerRect.top,
            });
        }
        setIsOpen((prev) => !prev);
    };

    const handleDragStart = (e) => {
        if (!popupRef.current) return;

        const popupRect = popupRef.current.getBoundingClientRect();
        dragOffset.current = {
            x: e.clientX - popupRect.left,
            y: e.clientY - popupRect.top,
        };
        setDragging(true);
    };

    const handleDrag = (e) => {
        if (!dragging) return;

        setPosition({
            x: e.clientX - dragOffset.current.x + window.scrollX, // Add scroll offset
            y: e.clientY - dragOffset.current.y + window.scrollY, // Add scroll offset
        });
    };

    const handleDragEnd = () => {
        setDragging(false);
    };

    // Iterate through children to find Trigger and Contents
    const renderChildren = () => {
        return Children.map(children, (child) => {
            if (child.type === DraggablePopup.Trigger) {
                return cloneElement(child, {
                    ref: triggerRef,
                    onClick: handleTriggerClick,
                });
            }

            if (child.type === DraggablePopup.Contents && isOpen) {
                return ReactDOM.createPortal(
                    cloneElement(child, {
                        ref: popupRef,
                        position,
                        onDragStart: handleDragStart,
                        onDrag: handleDrag,
                        onDragEnd: handleDragEnd,
                    }),
                    document.body
                );
            }
        });
    };

    return (
        <>
            {renderChildren()}
        </>
    );
};

DraggablePopup.Trigger = forwardRef(({ children, onClick, ...rest }, ref) => (
    <div ref={ref} onClick={onClick} {...rest} className="inline-block">
        {children}
    </div>
));

DraggablePopup.Trigger.displayName = 'DraggablePopup.Trigger';

DraggablePopup.Contents = forwardRef(
    ({ children, title, position, onDragStart, onDrag, onDragEnd, ...rest }, ref) => {
        return (
        <Block 
            ref={ref}
            className={'absolute p-4 flex flex-col gap-2'}
            style={{
                top: position?.y || 0,
                left: position?.x || 0,
            }}
            onMouseMove={onDrag}
            onMouseUp={onDragEnd}
            
            {...rest}
        >
            <div className="flex gap-1 -ml-1">
                <IconGripVertical 
                    className='w-4 h-4 cursor-grab'
                    onMouseDown={onDragStart}
                />
                { title &&
                    <Text className={"leading-none"}>{title}</Text>
                }
            </div>
            <div className="flex flex-col gap-4">{children}</div>
        </Block>
        );
    }
);

DraggablePopup.Contents.displayName = 'DraggablePopup.Contents';

export default DraggablePopup;
