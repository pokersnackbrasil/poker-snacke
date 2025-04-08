
type Props = {
	icon: string;
	alt: string;
};

export const Icon = ({icon,alt}:Props) => {
	  return (
      <span style={{ aspectRatio: 1, height: "5vh" }}>
        <img src={icon} alt={alt} style={{ aspectRatio: 1, height: "5vh" }} />
      </span>
    );
}
