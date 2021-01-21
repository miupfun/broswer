export class ColorUtil {
  static colorHex(str: string): string {
    let i;
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let that = str;
    if (/^(rgb|RGB)/.test(that)) {
      const aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = that;
      }
      return strHex;
    }
    if (reg.test(that)) {
      const aNum = that.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return that;
      } else if (aNum.length === 3) {
        let numHex = "#";
        for (i = 0; i < aNum.length; i += 1) {
          numHex += (aNum[i] + aNum[i]);
        }
        return numHex;
      }
    }
    return that;
  }

  static colorRgb(str: string): string {
    let i;
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = str.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      const sColorChange = [];
      for (i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return "rgb(" + sColorChange.join(",") + ")";
    } else {
      return sColor;
    }
  }

  static getContrastYIQ(hexcolor: string): string | null {
    const colorrgb = this.colorRgb(hexcolor);
    const colors = colorrgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!colors || colors.length !== 4) {
      return null
    }
    const red = parseInt(colors[1]);
    const green = parseInt(colors[2]);
    const blue = parseInt(colors[3]);

    let brightness;
    brightness = (red * 299) + (green * 587) + (blue * 114);
    brightness = brightness / 255000;
    if (brightness >= 0.5) {
      return "#303030";
    }
    return "#fff";
  }
}