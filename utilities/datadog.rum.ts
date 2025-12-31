export interface DatadogRUMConfig {
  clientToken: string
  applicationId: string
  site: string
  service: string
  env: string
  version?: string
  sessionSampleRate: number
  sessionReplaySampleRate: number
  trackBfcacheViews: boolean
  defaultPrivacyLevel: 'mask-user-input' | 'mask' | 'allow'
  enabled: boolean
}

export class DatadogRUM {
  private config: DatadogRUMConfig

  constructor(config: Partial<DatadogRUMConfig> = {}) {
    this.config = {
      clientToken: process.env.DD_RUM_CLIENT_TOKEN || '',
      applicationId: process.env.DD_RUM_APPLICATION_ID || '',
      site: process.env.DD_RUM_SITE || 'us5.datadoghq.com',
      service: process.env.DD_RUM_SERVICE || 'test_sauce_demo',
      env: process.env.DD_RUM_ENV || 'test',
      version: process.env.DD_RUM_VERSION,
      sessionSampleRate: Number(process.env.DD_RUM_SESSION_SAMPLE_RATE) || 100,
      sessionReplaySampleRate: Number(process.env.DD_RUM_SESSION_REPLAY_SAMPLE_RATE) || 20,
      trackBfcacheViews: true,
      defaultPrivacyLevel: 'mask-user-input',
      enabled: process.env.DD_RUM_ENABLED !== 'false',
      ...config,
    }
  }

  getInjectionScript(): string {
    if (!this.config.enabled) {
      return ''
    }
    const versionConfig = this.config.version ? `version: '${this.config.version}',` : ''
    return `
      <script>
        (function(h,o,u,n,d) {
          h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
          d=o.createElement(u);d.async=1;d.src=n
          n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
        })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v6/datadog-rum.js','DD_RUM')
        window.DD_RUM.onReady(function() {
          window.DD_RUM.init({
            clientToken: '${this.config.clientToken}',
            applicationId: '${this.config.applicationId}',
            site: '${this.config.site}',
            service: '${this.config.service}',
            env: '${this.config.env}',
            ${versionConfig}
            sessionSampleRate: ${this.config.sessionSampleRate},
            sessionReplaySampleRate: ${this.config.sessionReplaySampleRate},
            trackBfcacheViews: ${this.config.trackBfcacheViews},
            defaultPrivacyLevel: '${this.config.defaultPrivacyLevel}',
          });
        })
      </script>
    `
  }

  injectIntoHTML(html: string): string {
    if (!this.config.enabled) {
      return html
    }
    const script = this.getInjectionScript()

    // Try to inject after <head> tag
    if (html.includes('<head>')) {
      return html.replace('<head>', `<head>${script}`)
    }

    // Fallback: inject after <html> tag
    if (html.includes('<html>')) {
      return html.replace('<html>', `<html>${script}`)
    }
    // Last resort: prepend to document
    return script + html
  }
  isEnabled(): boolean {
    return this.config.enabled
  }
  addCustomAction(page: any, name: string, context?: Record<string, any>) {
    if (!this.config.enabled) return

    return page.evaluate(
      ({ actionName, actionContext }: { actionName: string; actionContext?: Record<string, any> }) => {
        if (window.DD_RUM) {
          window.DD_RUM.addAction(actionName, actionContext)
        }
      },
      { actionName: name, actionContext: context },
    )
  }
  setUser(page: any, user: { id?: string; name?: string; email?: string }) {
    if (!this.config.enabled) return

    return page.evaluate((userData: any) => {
      if (window.DD_RUM) {
        window.DD_RUM.setUser(userData)
      }
    }, user)
  }
}
declare global {
  interface Window {
    DD_RUM?: {
      init: (config: any) => void
      addAction: (name: string, context?: any) => void
      setUser: (user: any) => void
      onReady: (callback: () => void) => void
      q: any[]
    }
  }
}

export const datadogRUM = new DatadogRUM()
