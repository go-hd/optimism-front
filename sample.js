// ==UserScript==
// @name           Grateful GoQ status
// @namespace      https://go-hd.jp/
// @version        0.2
// @description    Change GoQ status beautiful
// @author         You
// @match          https://order.goqsystem.com/goq21/*
// @grant          none
// @run-at         document-start
// ==/UserScript==

;(function() {
  'use strict'

  /*
   * カスタマイズ項目
   */
  const COLUMN_COUNT = 11 // 列数
  const HIDDEN = '' // 非表示にしたいステータスに含まれる単語（カンマ区切り）

  /*
   * スクリプト
   */
  const config = {
    targetTable: '#goq_global_navigation_table + table',
    columnCount: COLUMN_COUNT,
    hidden: HIDDEN
  }

  styling(config)
  document.addEventListener('DOMContentLoaded', () => onload(config))

  function onload({ targetTable, hidden }) {
    const hiddenRegExp = new RegExp(hidden.split(',').join('|'), 'g')

    Array.from(
      document.querySelectorAll(`${targetTable} > tbody > tr > td`),
      (el) => {
        if (hidden.length && hiddenRegExp.test(el.innerHTML)) return el.remove()
        if (/自動/.test(el.innerHTML)) el.classList.add('auto')

        el.innerHTML = el.innerHTML.replace(
          /（(\d+)件）/g,
          '<div class="badge">$1</div>'
        )
        el.innerHTML = el.innerHTML.replace(/<br.*>/g, '')
        el.addEventListener('click', (event) => {
          event.target.querySelector('a').click()
        })
      }
    )
  }

  function styling({ targetTable, columnCount }) {
    const style =
      'data:text/css;charset=UTF-8,' +
      encodeURIComponent(`
        ${targetTable} {
          width: 100%;
          border-left: 1px solid #ccc;
          background: #ccc;
        }

        ${targetTable} > tbody > tr {
          display: grid;
          grid-template-columns: repeat(${columnCount}, 1fr);
        }

        ${targetTable} > tbody > tr * {
          overflow: hidden;
          white-space: nowrap;
        }

        ${targetTable} > tbody > tr > td {
          position: relative;
          padding-right: 1em;
          border-top: 1px solid #ccc;
          border-right: 1px solid #ccc;
          width: 100%;
          box-sizing: border-box;
          transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
        }

        ${targetTable} > tbody > tr > td br,
        ${targetTable} > tbody > tr > td:not([class*=seltabs]) {
          display: none;
        }

        ${targetTable} > tbody > tr a {
          text-decoration: none;
          color: black;
        }

        ${targetTable} > tbody > tr > td.auto a {
          color: rgb(2, 117, 184);
        }

        ${targetTable} > tbody > tr > td:hover a,
        ${targetTable} > tbody > tr > td.seltabs a {
          color: white;
        }

        ${targetTable} > tbody > tr > td:hover {
          background: #666;
          cursor: pointer;
        }

        ${targetTable} > tbody > tr > td .badge {
          position: absolute;
          right: 1em;
          top: 0.45em;
          background: #777;
          color: white;
          border-radius: 5px;
          padding: 0.25em 0.5em;
          text-decoration: none;
          font-size: 0.8em;
          margin-left: 0.5em;
        }

        ${targetTable} > tbody > tr > td:hover .badge {
          background: #eee;
          color: #777;
        }`)

    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', style)

    document.head.appendChild(link)
  }
})()
