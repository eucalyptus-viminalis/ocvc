
type ActionCardProps = {
    buttonHint: string;
    id?: string;
    gap?: number;
    width?: string | number;
    height?: string | number;
    justifyContent?: string;
    children: JSX.Element | JSX.Element[];
    selected: boolean;
};
export default function ActionCard(props: ActionCardProps) {
    const {
        buttonHint,
        gap,
        id,
        width,
        height,
        justifyContent,
        children,
        selected,
    } = props;
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: width ?? "100%",
                height: height ?? "100%",
                borderColor: "white",
                backgroundColor: selected ? "#491768" : "",
                borderWidth: 5,
                borderRadius: 20,
                wordBreak: "break-word",
                justifyContent: justifyContent ?? "space-around",
                gap: gap ?? 0,
                alignItems: "center",
                textAlign: "center",
            }}
        >
            {children}
            {/* Button hint */}
            <span
                style={{
                    display: "flex",
                    position: "absolute",
                    left: "50%",
                    bottom: -10,
                    transform: "translate(-50%, 100%)",
                    // translate: '[-50, -50]'
                }}
            >
                {buttonHint}
            </span>
        </div>
    );
}