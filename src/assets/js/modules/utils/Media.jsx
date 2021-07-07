import { importAll } from "./Tool";
import logo from "../../../media/img/logo.png";

const Media = {
	logo: logo,
	img: {
		backgrounds: (a) =>
			importAll(
				require.context(
					"../../../media/img/backgrounds/",
					false,
					/\.(png|jpe?g|svg)$/
				),
				a
			),
		slideshow: (a) =>
			importAll(
				require.context(
					"../../../media/img/slideshow/",
					false,
					/\.(png|jpe?g|svg)$/
				),
				a
			),
	},
	svg: {
		illustrations: (a) =>
			importAll(
				require.context(
					"../../../media/svg/illustration/",
					false,
					/\.(png|jpe?g|svg)$/
				),
				a
			),
		socialMedia: (a) =>
			importAll(
				require.context(
					"../../../media/svg/social-media/",
					false,
					/\.(png|jpe?g|svg)$/
				),
				a
			),
	},
	icons: (a) =>
		importAll(
			require.context(
				"../../../media/svg/ui-icons/",
				false,
				/\.(png|jpe?g|svg)$/
			),
			a
		),
};

export default Media;
