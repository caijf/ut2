let idCounter = 1;

/**
 * 唯一标识
 *
 * @static
 * @alias module:Util.uniqueId
 * @since 1.0.0
 * @param {string} [prefix=ut2_id_] 前缀
 * @returns {string} 唯一标识
 */
function uniqueId(prefix = 'ut2_id_') {
  return `${prefix}${++idCounter}`;
}

export default uniqueId;
