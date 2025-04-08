
type Props = {
	icon: string;
	link: string;
	alt: string;
};

export const Icon = ({icon,link,alt}:Props) => {
	  return (
      <span style={{ aspectRatio: 1, height: "5vh" }}>
        <img src={icon} alt={alt} style={{ aspectRatio: 1, height: "5vh" }} />
      </span>
    );
}
