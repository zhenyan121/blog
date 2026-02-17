// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = {
	[categoryName: string]: Device[];
} & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
	iQOONeo: [
		{
			name: "iQOO Neo10 Pro+",
			image: "/images/device/iqooneo10proplus.png",
			specs: "超级像素 / 16G + 512G",
			description: "6800mAh电池,120W超快闪充,2k144HZ,外观喜欢",
			link: "https://www.vivo.com.cn/vivo/param/iqooneo10proplus",
		},
	],
	LapTop: [
		{
			name: "联想R9000P 2025",
			image: "/images/device/r9000p2025.jpg",
			specs: "8745HX + RTX5060",
			description: "亏",
			link: "https://item.lenovo.com.cn/product/1045455.html",
		},
	],
};

