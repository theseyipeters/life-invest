import { Modal, ModalProps } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode } from "react";

interface OverlayModalProps extends ModalProps {
	children: ReactNode;
	width?: number;
	radius?: number;
}

export default function OverlayModal({
	children,
	opened,
	width,
	radius = 40,
	onClose,
	...rest
}: OverlayModalProps) {
	const isMobile = useMediaQuery("(max-width: 768px)");
	return (
		<Modal
			pos={"relative"}
			padding={0}
			size={isMobile ? "100%" : width}
			fullScreen={isMobile}
			radius={radius}
			closeButtonProps={{ mt: "20px", mr: "30px" }}
			closeOnClickOutside
			closeOnEscape
			lockScroll
			centered
			opened={opened}
			onClose={onClose}
			{...rest}>
			{children}
		</Modal>
	);
}
