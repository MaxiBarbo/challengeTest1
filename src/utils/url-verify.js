
class BASE_URL {
    constructor(page) {
        this.page = page;
        
    }

    async screenDesktopSize(width, height) {
        await this.page.setViewportSize({ width: width, height: height });
        const actualViewportSize = this.page.viewportSize();
        // Verificar si las dimensiones coinciden con las configuradas
        if (actualViewportSize.width === 1920 && actualViewportSize.height === 1000) {
            console.log(`Test Desktop Screen: widht: ${actualViewportSize.width}px y height: ${actualViewportSize.height}px correctos.`);
        } else {
            throw new Error(`¡Error! El tamaño actual widht: ${actualViewportSize.width}px y height: ${actualViewportSize.height}px del viewport/screen no coincide con version desktop 1920px 1000px.`);
        }
    }

    async screenMobileSizeIphone12(width, height) {
        await this.page.setViewportSize({ width: width, height: height });
        const actualViewportSize = this.page.viewportSize();
          // Verificar si las dimensiones coinciden con las configuradas
        if (actualViewportSize.width === 390 && actualViewportSize.height === 844) {
            console.log(`Test Iphone12 pro: widht: ${actualViewportSize.width}px y height: ${actualViewportSize.height}px del viewport/screen son correctos.`);
        } else {
            throw new Error(`¡Error! El tamaño actual del widht: ${actualViewportSize.width}px y height: ${actualViewportSize.height}px del viewport no coincide con la configuración Iphone12 pro: 390px y 844px`);
        }
    }
}

module.exports = BASE_URL;
