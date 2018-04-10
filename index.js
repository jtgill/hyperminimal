exports.decorateConfig = (config) => {
  const macosCSS = `
    .header_header {
      top: 0;
      right: 0;
      left: 0;
    }
    .tabs_borderShim {
      display: none;
    }
    .tabs_title {
      display: none;
    }
    .tabs_list {
      margin-left: 0;
    }
    .tab_tab:first-of-type {
      border-left-width: 0;
      padding-left: 1px;
    }
  `
  const defaultCSS = `
    .header_windowHeader {
      display: none;
    }
    .tabs_nav {
      top: 0;
    }
    .tabs_list {
      padding-left: 0;
    }
    .tabs_list:before {
      display: none;
    }
    .tab_first {
      border-left-width: 0;
    }
    .terms_terms {
      margin-top: 0;
    }
    .terms_termsShifted {
      margin-top: 34px;
    }
    .tab_tab:after {
      display: none;
    }
  `

    const win32CSS = `
        .header_shape {
            display: none;
        }
        .header_windowControls {
            display: none;
        }
        .header_appTitle {
            font-size: 0px;
        }
        .header_windowHeader {
            width: 40px;
        }
        .tabs_nav {
            top: 0px;
            padding-left: 40px;
            z-index: 10;
        }
        .tabs_nav:after {
            display: none;
        }
        .terms_terms {
            margin-top: 0;
        }
        .terms_termsShifted {
            margin-top: 40px;
        }
    `

  return Object.assign({}, config, {
    css: `
      ${config.css || ''}
      ${process.platform === 'darwin' ? macosCSS : process.platform === 'win32' ? win32CSS : defaultCSS}
    `
  });
}

// Hide window controls on macOS
exports.decorateBrowserOptions = defaults => Object.assign({}, defaults, {
  titleBarStyle: '',
  transparent: true,
  frame: false
})

// Removes the redundant space on mac if there is only one tab
exports.getTabsProps = (parentProps, props) => {
  if (process.platform === 'darwin') {
    var classTermsList = document.getElementsByClassName('terms_terms')
    if (classTermsList.length > 0) {
      var classTerms = classTermsList[0]
      if (props.tabs.length <= 1) {
        classTerms.setAttribute('style', 'margin-top: 0')
      } else {
        classTerms.setAttribute('style', '')
      }
    }
  }
  return Object.assign({}, parentProps, props)
}
